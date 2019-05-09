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
Comment.destroy_all


User.create(name:'Scott', title: 'TCA Lead', location: 'R* North', assigner_id: 1, image_url: 'https://png.pngtree.com/svg/20170505/b6219c949e.svg')

Task.create(user_id: 1, name: 'Fix lod - NB_01', content: 'Sam level lod plz', 
            deadline: Time.at(Time.now.to_i + 46200), status: true, image_url: 'https://png.pngtree.com/svg/20170505/b6219c949e.svg', tag: 'High')

Comment.create(task_id: 1, content: 'fix this shit yo')

Task.create(user_id: 1, name: 'new lods', content: 'remake all the lods in the game', 
    deadline: Time.at(Time.now.to_i + 70000), status: false, image_url: 'https://png.pngtree.com/svg/20170505/b6219c949e.svg', tag: 'Medium')

Comment.create(task_id: 2, content: 'adadad')
Comment.create(task_id: 2, content: 'fix this saadad')
Comment.create(task_id: 2, content: 'fix adad')


Task.create(user_id: 1, name: 'new lods for church', content: 'remake SD', 
    deadline: Time.at(Time.now.to_i + 55400), status: true, image_url: 'https://png.pngtree.com/svg/20170505/b6219c949e.svg', tag: 'Low')

Comment.create(task_id: 3, content: 'adaadadd')
Comment.create(task_id: 3, content: 'fixadads saadad')
Comment.create(task_id: 3, content: 'fix adad')
Comment.create(task_id: 3, content: 'adadad')
Comment.create(task_id: 3, content: 'fix adadhis saadad')
Comment.create(task_id: 3, content: 'fix adadad')

User.create(name:'Tim', title: 'Junior TCA', location: 'R* Leeds', assigner_id: 2, image_url: 'https://png.pngtree.com/svg/20170505/b6219c949e.svg')

Task.create(user_id: 2, name: 'Bank needs more dirt', content: 'Aaron lod plz', 
    deadline: Time.at(Time.now.to_i + 66200), status: true, image_url: 'https://png.pngtree.com/svg/20170505/b6219c949e.svg', tag: 'Jack, D class')

Comment.create(task_id: 4, content: 'Test needs testing')
Comment.create(task_id: 1, content: 'Beast Mode')

