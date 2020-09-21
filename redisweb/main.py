# -*- coding: utf-8 -*-
# @Time    : 2020/7/22 16:59
# @Author  : CC
# @Desc    : main.py
import sys

from redisweb import RedisBoardExtension
from flask import Flask


def create_app():
    host = 'localhost'
    port = 6379
    password = None
    if len(sys.argv) == 3:
        host = sys.argv[1]
        port = sys.argv[2]
    if len(sys.argv) > 3:
        host = sys.argv[1]
        port = sys.argv[2]
        password = sys.argv[3]
    app = Flask(__name__)
    app.config['SECRET_KEY'] = '123456'
    RedisBoardExtension(app=app, redis_host=host, redis_port=port, redis_password=password)
    app.run()


if __name__ == '__main__':
    create_app()
