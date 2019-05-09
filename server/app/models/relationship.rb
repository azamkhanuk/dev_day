class Relationship < ApplicationRecord
    belongs_to :user
    belongs_to :assigner, class_name: "Task"
    belongs_to :task
end
