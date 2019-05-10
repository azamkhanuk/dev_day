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

# rand(5000..75000)

User.create(name:'Peter Keller', title: 'Junior Dev', location: 'London', image_url: 'https://i.imgur.com/VEmwYyW.png')

    Task.create(assigner_id: rand(1..4), user_id: 1, name: 'Fix auth for signup', content: 'Discuss with Ranjit and sort out what we need to do', 
                deadline: Time.at(Time.now.to_i + rand(5000..75000)), status: true, image_url: 'https://www.codica.com/blog/top-ruby-gems-we-cant-live-without/Ruby-JWT-codica.jpg', tag: 'High')

        Comment.create(task_id: 1, content: 'Good progress')

    Task.create(assigner_id: rand(1..4), user_id: 1, name: 'New feature- Group chat', content: 'Add Feature to have a group chat', 
        deadline: Time.at(Time.now.to_i + rand(5000..75000)), status: false, image_url: 'https://pics.me.me/when-two-people-use-the-group-chat-for-a-1-on-1-2530512.png', tag: 'Medium')

        Comment.create(task_id: 2, content: 'Seems to be going well')
        Comment.create(task_id: 2, content: 'Needs some work')
        Comment.create(task_id: 2, content: 'Almost There')

    Task.create(assigner_id: rand(1..4), user_id: 1, name: 'Fix delete button', content: 'Delete button doesnt work', 
        deadline: Time.at(Time.now.to_i + rand(5000..75000)), status: true, image_url: 'http://images3.memedroid.com/images/UPLOADED484/5b4db5448fb57.jpeg', tag: 'Low')

        Comment.create(task_id: 3, content: 'Almost there')
        Comment.create(task_id: 3, content: 'Ranjit helping me out')

User.create(name:'Ranjit Saimbi', title: 'Junior Full Stack', location: 'Paris', image_url: 'https://i.imgur.com/8L11N4F.png')

    Task.create(assigner_id: rand(1..4), user_id: 2, name: 'Switch sql database', content: 'Can you switch the database from sql to mongo please', 
        deadline: Time.at(Time.now.to_i + rand(5000..75000)), status: true, image_url: 'https://bensonnjonjo.files.wordpress.com/2013/04/code-bg.png', tag: 'Medium')

        Comment.create(task_id: 4, content: 'Test needs testing')
        Comment.create(task_id: 1, content: 'Good job so far')


User.create(name:'Manon Jacquin', title: 'Junior Full Stack', location: 'Dublin', image_url: 'https://i.imgur.com/iEQwWA3.png')

    Task.create(assigner_id: rand(1..4), user_id: 3, name: 'Sort data and optimise', content: 'Our data is not in hand right now, can you take a look', 
        deadline: Time.at(Time.now.to_i + rand(5000..75000)), status: true, image_url: 'http://1.bp.blogspot.com/-JKZ_l0SxQN0/Uy2y12GqMsI/AAAAAAAAAHc/kyurVPQ6LqE/s1600/static-non-static.jpg', tag: 'High')

        Comment.create(task_id: 4, content: 'Making progress')

    
    Task.create(assigner_id: rand(1..4), user_id: 3, name: 'Adopt node.js into our new project', content: 'Can you add node.js to our new top super secret project', 
    deadline: Time.at(Time.now.to_i + rand(5000..75000)), status: false, image_url: 'https://webat.net/wp-content/uploads/2018/12/phpcodesnippets-humanreadable-712x325.png', tag: 'Medium')

        Comment.create(task_id: 1, content: 'Nice making progress')
        Comment.create(task_id: 1, content: 'Seems really easy so far')
        Comment.create(task_id: 1, content: 'Finished')

        
User.create(name:'Azam Khan', title: 'Lead Full Stack Engineer', location: 'New York', image_url: 'https://i.imgur.com/nyalF7J.png')

    Task.create(assigner_id: 4, user_id: 4, name: 'Meeting with team', content: 'Go over new features from our VP', 
    deadline: Time.at(Time.now.to_i + rand(5000..75000)), status: true, image_url: 'https://cdn-images-1.medium.com/max/2400/0*aEvz1gdQhix8dzTi', tag: 'High')

        Comment.create(task_id: 4, content: 'Meeting went well')