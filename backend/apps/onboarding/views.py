from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .services import (
    get_session,
    get_next_question,
    save_answer,
    calculate_progress
)

class OnboardingCurrentStepView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        session = get_session(request.user)

        last_answer = None

        last_record = session.answers.order_by("-id").first()

        if last_record:
            last_answer = last_record.answer

        question = get_next_question(
            session,
            last_answer
        )

        return Response({
            "role": session.role,
            "step": session.current_step,
            "progress": calculate_progress(session),
            "question": question,
            "completed": question is None
        })
    
class OnboardingAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        session = get_session(request.user)

        question_id = request.data.get("question_id")
        answer = request.data.get("answer")

        save_answer(
            session,
            question_id,
            answer
        )

        next_question = get_next_question(
            session,
            answer
        )

        return Response({
            "next_question": next_question,
            "step": session.current_step,
            "progress": calculate_progress(session),
            "completed": next_question is None
        })