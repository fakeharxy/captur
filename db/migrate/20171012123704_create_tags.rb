class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.text :description
      t.integer :importance
      t.datetime :last_seen

      t.timestamps
    end
  end
end
