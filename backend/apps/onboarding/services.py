from .models import OnboardingSession, OnboardingAnswer


# ==========================================
# BASE FLOW
# ==========================================

BASE_FLOW = {
    "STUDENT": {
        "start": "q1"
    },

    "TEACHER": {
        "start": "q1"
    },

    "PARENT": {
        "start": "q1"
    },

    "ADMIN": {
        "start": "q1"
    }
}


# ==========================================
# QUESTION BANK
# ==========================================

QUESTIONS = {

    "q1": {
        "text": "What level are you in?",
        "emotion": "welcoming",
        "animation": "fade_slide",
        "message": "Let's personalize your experience."
    },

    "q2_student_primary": {
        "text": "Do you prefer learning with visuals or text?",
        "emotion": "encouraging",
        "animation": "bounce_soft",
        "message": "We're shaping the best way for you to learn."
    },

    "q2_student_secondary": {
        "text": "Which subject is your strongest?",
        "emotion": "motivational",
        "animation": "slide_left",
        "message": "Every strength tells a story."
    },

    "q2_teacher": {
        "text": "How many classes do you handle?",
        "emotion": "professional",
        "animation": "fade",
        "message": "We're optimizing your workflow."
    }
}


# ==========================================
# SESSION CREATION
# ==========================================

def get_session(user):

    session, created = OnboardingSession.objects.get_or_create(
        user=user,
        defaults={
            "role": user.role
        }
    )

    return session


# ==========================================
# ADAPTIVE QUESTION ENGINE
# ==========================================

def get_next_question(session, last_answer=None):

    role = session.role.upper()

    # FIRST QUESTION
    if session.current_step == 0:
        return QUESTIONS["q1"]

    # STUDENT FLOW
    if role == "STUDENT":

        if session.current_step == 1:

            if last_answer:

                if last_answer.lower() in [
                    "primary",
                    "grade school"
                ]:
                    return QUESTIONS["q2_student_primary"]

                return QUESTIONS["q2_student_secondary"]

    # TEACHER FLOW
    if role == "TEACHER":

        if session.current_step == 1:
            return QUESTIONS["q2_teacher"]

    # END FLOW
    session.completed = True
    session.save()

    return None

def calculate_progress(session):

    role = session.role.upper()

    total_steps = 2

    if role == "STUDENT":
        total_steps = 2

    elif role == "TEACHER":
        total_steps = 2

    progress = int(
        (session.current_step / total_steps) * 100
    )

    return min(progress, 100)

# ==========================================
# SAVE ANSWERS
# ==========================================

def save_answer(session, question_id, answer):

    OnboardingAnswer.objects.create(
        session=session,
        step_index=session.current_step,
        question=question_id,
        answer=answer
    )

    session.current_step += 1
    session.save()