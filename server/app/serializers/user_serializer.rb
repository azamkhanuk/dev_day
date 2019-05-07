class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :title, :location, :assigner_id, :image_url, :tasks
  has_many :tasks
  class TaskSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :name, :content, :deadline, :status, :image_url, :tag,  :created_at, :updated_at, :comments
    has_many :comments
      class CommentSerializer < ActiveModel::Serializer
        attributes :id, :task_id, :content
      end
  end
end