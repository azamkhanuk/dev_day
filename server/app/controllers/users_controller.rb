class UsersController < ApplicationController

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user
        else
            render json: {error: 'Nope, not here.'}, status: 404
        end
    end

    def index
        user = User.all
        if user
            render json: user
        else
            render json: {error: 'Nope, not here.'}, status: 404
        end
    end
end
