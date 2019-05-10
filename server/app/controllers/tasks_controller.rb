class TasksController < ApplicationController
    def create
        task = Task.new(
                    name: params[:name],
                    user_id: params[:user_id], 
                    content: params[:content],
                    deadline: params[:deadline],
                    status: params[:status],
                    image_url: params[:image_url],
                    tag: params[:tag],
                    assigner_id: params[:assigner_id]
                    )
        if task.save
            render json: task
        else
            render json: {error: 'Nope, not here.'}, status: 400
        end
    end

    def destroy
        task = Task.find_by(id: params[:id])
        if task
            task.destroy
            render json: {message: 'destroyed'}
        else
            render json: {error: 'not found'}, status: 404
        end
    end

    def update
        task = Task.find_by(id: params[:id])
        if task
            task.update(taskparams)
            render json: task
        else
            render json: {error: 'Nope, not here.'}, status: 400
        end
    end

    def index
        task = Task.all
        if task
            render json: task
        else
            render json: {error: 'Nope, not here.'}, status: 404
        end
    end

    def show
        task = Task.find_by(id: params[:id])
        if task
            render json: task
        else
            render json: {error: 'Nope, not here.'}, status: 404
        end
    end

    private

    def taskparams
        params.require(:task).permit(:id, :name, :user_id, :content, :tag, :status, :assigner_id, :image_url)
    end
end