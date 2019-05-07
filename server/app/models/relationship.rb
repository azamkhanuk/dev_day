class Relationship < ApplicationRecord
    belongs_to :user
    belongs_to :assigner, class_name: "User"
end
