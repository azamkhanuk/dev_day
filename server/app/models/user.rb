class User < ApplicationRecord
    has_many :tasks

    has_many :assigners, :class_name => "Relationship", :foreign_key => "user_id"
    has_many :assigning, :class_name => "Relationship", :foreign_key => "assigner_id"
end
