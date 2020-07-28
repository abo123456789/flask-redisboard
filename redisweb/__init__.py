from werkzeug.urls import url_quote_plus

from .redisboard import module


class RedisBoardExtension:
    def __init__(self, app=None, redis_host='localhost', redis_port=6379, redis_password=None):
        self.app = app
        self.redis_host = redis_host
        self.redis_port = redis_port
        self.redis_password = redis_password

        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        for k, v in self._default_config().items():
            app.config.setdefault(k, v)

        if not app.config.get("SECRET_KEY"):
            raise RuntimeError(
                "The Flask-RedisBoard requires the 'SECRET_KEY' config var to be set"
            )

        app.jinja_env.filters["quote_plus"] = url_quote_plus
        app.register_blueprint(module, url_prefix="/redisboard")

    def _default_config(self):
        return {
            "REDIS_HOST": self.redis_host,
            "REDIS_PORT": self.redis_port,
            "REDIS_PASSWORD": self.redis_password,
            "REDIS_UNIX_SOCKET_PATH": None,
            "REDISBOARD_SOCKET_TIMEOUT": None,
            "REDISBOARD_SOCKET_CONNECT_TIMEOUT": None,
            "REDISBOARD_SOCKET_KEEPALIVE": None,
            "REDISBOARD_SOCKET_KEEPALIVE_OPTIONS": None,
            "REDISBOARD_SLOWLOG_LEN": 100,
        }
