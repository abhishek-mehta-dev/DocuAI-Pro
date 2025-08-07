import enum

class UserType(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"