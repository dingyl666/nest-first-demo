import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ApiResponseModel } from "./api.response";


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T,ApiResponseModel<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponseModel<T>> | Promise<Observable<ApiResponseModel<T>>> {

    return next.handle().pipe(
      map(data => {
        const code = context.switchToHttp().getResponse().statusCode ;
        return new ApiResponseModel<T>(
          data,
          code,
          Date.now(),
        )
      })
    )
  }
}