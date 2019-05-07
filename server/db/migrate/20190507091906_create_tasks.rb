class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.integer :user_id

      t.string :name
      t.text :content
      t.datetime :deadline
      t.boolean :status
      t.string :image_url
      t.string :tag

      t.timestamps
    end
  end
end
