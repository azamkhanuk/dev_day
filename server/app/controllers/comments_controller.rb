class CommentsController < ApplicationController

    def show
        comment = Comment.find_by(id: params[:id])
        if comment
            render json: comment
        else
            render json: {error: 'Nope, not here.'}, status: 404
        end
    end

    def findComment
        comment = Comment.where(task_id: params[:task_id])
        if comment
            render json: comment
        else
            render json: {error: 'Nope, not here.'}, status: 404
        end
    end

    def create
        comment = Comment.new(
            content: params[:content],
            task_id: params[:task_id]
        )
        if comment.save
            render json: comment
        else
            render json: {error: 'Nope, not here.'}, status: 400
        end
    end
end
