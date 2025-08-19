import enum

class PaymentStatus(str,enum.Enum):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"