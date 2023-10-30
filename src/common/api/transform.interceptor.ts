import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ApiResponse } from "./api.response";
import { map, Observable } from "rxjs";


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T,ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> | Promise<Observable<ApiResponse<T>>> {

    return next.handle().pipe(
      map(data => {
        const code = context.switchToHttp().getResponse().statusCode ;
        return new ApiResponse<T>(
          data,
          code,
          Date.now(),
        )
      })
    )
  }
}