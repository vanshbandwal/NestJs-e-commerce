import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateUserDto } from './Dto/CreateUserDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { addproductDto } from './Dto/Product.dto';
import { AuthGuards } from './api.gaurd';

@Controller('api')
export class ApiController {
  constructor(private authService: ApiService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('product', { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.authService.upload(file);
  }

  @Post('signup')
  signup(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.signup(CreateUserDto);
  }

  @Post('addproduct')
  addproduct(@Body() addproductDto: addproductDto) {
    return this.authService.addproduct(addproductDto);
  }

  @Get('getproducts')
  getproducts() {
    return this.authService.getproducts();
  }

  @Post('removedproduct')
  async removeProduct(@Body('id') id: string) {
    return await this.authService.removedproduct(id);
  }
  @Post('login')
  login(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.login(CreateUserDto);
  }
  @UseGuards(AuthGuards)
  @Get('getcart')
  async getcart(@Req() req) {
    return this.authService.getcart(req.user.id);
  }
  @UseGuards(AuthGuards)
  @Post('addtocart')
  async addtocart(@Req() req, @Body() id: string) {
    return this.authService.addtocart(req.user.id, id);
  }
  @UseGuards(AuthGuards)
  @Post('removefromcart')
  async removefromcart(@Req() req, @Body('id') id: string) {
    return this.authService.removefromcart(req.user.id, id);
  }

  @UseGuards(AuthGuards)
  @Get('totalAmount')
  async totalproduct(@Req() req) {
    return this.authService.totalAmount(req.user.id);
  }

  @UseGuards(AuthGuards)
  @Get('totalCart')
  async totalCart(@Req() req){
    return this.authService.totalcart(req.user.id)
  }
}
