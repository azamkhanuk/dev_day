class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :title
      t.string :location
      t.integer :assigner_id
      t.string :image_url
      t.timestamps
    end
  end
end
