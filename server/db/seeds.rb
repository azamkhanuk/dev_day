# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



# User.create(name: 'Luke', title: 'TCA', location: 'R* North', assigner_id: 1, image_url: 'xD')
# User.create(name: 'Ross', title: 'Junior TCA', location: 'R* North', assigner_id: 1, image_url: 'xD')

User.destroy_all
Task.destroy_all

User.create(name: 'Scott', title: 'TCA Lead', location: 'R* North', assigner_id: 1, image_url: 'xD')

Task.create(user_id: 1, name: 'Fix lod - NB_01', content: 'Sam level lod plz', 
            deadline: Time.now, status: true, image_url: 'XD', tag: 'Americas, A class')
