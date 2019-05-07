class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :title, :location, :assigner_id, :image_url, :tasks
end
