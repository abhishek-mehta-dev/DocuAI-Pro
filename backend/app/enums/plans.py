import enum

class PlanTitle(str, enum.Enum):
    STANDARD = "Standard"
    PRO = "Pro"  


class PlanPeriod(str, enum.Enum):
    MONTHLY = "monthly"
    YEARLY = "yearly"


class AIResponseType(str, enum.Enum):
    BASIC = "Basic AI responses"
    ADVANCED = "Advanced AI responses"