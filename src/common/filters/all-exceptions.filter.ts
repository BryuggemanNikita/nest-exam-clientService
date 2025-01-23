import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'winston';

@Catch()
export class OtherExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        @Inject('winston')
        private readonly logger: Logger,
    ) {}
    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errDetails =
            exception instanceof HttpException
                ? exception.getResponse()
                : {
                      message: exception['message'] || 'Internal Server Error',
                      statusCode: exception['statusCode'] || 500,
                  };

        const responseBody = {
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            errDetails: errDetails,
        };

        this.logger.warn(
            `status: ${httpStatus}, path: ${httpAdapter.getRequestUrl(ctx.getRequest())}`,
        );

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
