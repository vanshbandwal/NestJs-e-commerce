import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './Dto/CreateUserDto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './userSchema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { addproductDto } from './Dto/Product.dto';
import { Product, ProductDocument } from './Product.module';
import { Cart, CartDocument } from './cart.module';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}
  async upload(
    file: Express.Multer.File,
  ): Promise<{ success: boolean; image_url?: string; message?: string }> {
    if (!file) {
      return { success: false, message: 'No file provided' };
    }
    const uploadsDir = join(__dirname, '..', '..', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir);
    }
    const uniqueSuffix = uuidv4();
    const fileExtension = extname(file.originalname);
    const filename = `product-${uniqueSuffix}${fileExtension}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, file.buffer);

    return {
      success: true,
      image_url: `http://localhost:3000/uploads/${filename}`,
    };
  }
  async addproduct(addproductDto: addproductDto) {
    try {
      const { name, image, discription, price } = addproductDto;
      const newProduct = new this.productModel({
        name,
        discription,
        price,
        image,
      });
      await newProduct.save();
      return {
        success: true,
        message: 'Product added successfully',
      };
    } catch (error) {
      console.log('Error in Addproduct', error);
    }
  }
  async getproducts() {
    const product = await this.productModel.find({});
    return {
      success: true,
      product,
    };
  }
  async signup(CreateUserDto: CreateUserDto) {
    const { email, name, password } = CreateUserDto;
    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id.toString() }, 'SECRET_KEY', {
      expiresIn: '7d',
    });
    return {
      success: true,
      token,
      message: 'User signup successfully',
    };
  }
  async removedproduct(_id: string) {
    return await this.productModel.findByIdAndDelete(_id);
  }

  async login(CreateUserDto: CreateUserDto) {
    const { email, password } = CreateUserDto;
    console.log(email, password);
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id.toString() }, 'SECRET_KEY', {
      expiresIn: '7d',
    });
    return { success: true, token, message: 'Please login First' };
  }
  async getcart(userId: string) {
    const userExist = await this.cartModel.findOne({ userId }).populate("items.productId"); ;
    if (!userExist) {
      const newcart = new this.cartModel({
        userId,
      });
      await newcart.save();
      return newcart;
    } else {
      return userExist;
    }
  }
  async addtocart(userId: string, productId: string) {
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartModel({
        userId:new Types.ObjectId(userId),
        items: [{ productId:new Types.ObjectId(productId), quantity: 1 }],
      });
    } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === new Types.ObjectId(productId).toString(),
    );
      console.log(itemIndex)
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({
          productId: new Types.ObjectId(productId),
          quantity: 1,
        });
      }
    }

    await cart.save();

    return await cart.populate('items.productId');
  }

async removefromcart(userId: string, productId: string) {
  console.log("Incoming:", userId, productId);
  let cart = await this.cartModel.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found for this user");
  }

  const itemIndex = cart.items.findIndex((item) =>{  
    console.log(item.productId._id.toString(),productId)
     return item.productId._id.toString()===productId
  }
  );

  console.log("Found index:", itemIndex);

  if (itemIndex > -1) {
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }
  } else {
    throw new Error("Product not found in cart");
  }

  await cart.save();
  return {
    cart:await cart.populate("items.productId"),
    success:true
  }
}
async totalAmount(userId: string) {
  let cart = await this.cartModel
    .findOne({ userId })
    .populate("items.productId", "price");

  if (!cart) {
    return { success: false, message: "Cart not found" };
  }

  let totalAmount = 0;

  for (let i = 0; i < cart.items.length; i++) {
    const item: any = cart.items[i]; 
    
    if (item.productId && item.productId.price) {
      totalAmount += item.productId.price * item.quantity;
    }
  }

  return {
    success: true,
    totalAmount,
    cart,
  };
}
async totalcart(userId){
  console.log(userId)
  let cart = await this.cartModel
    .findOne({ userId })
    if (!cart) {
    return { success: false, message: "Cart not found" };
  }
    let total = cart.items.length
  return{
    total
  }
}


}


