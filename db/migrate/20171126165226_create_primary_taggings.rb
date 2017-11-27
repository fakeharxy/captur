class CreatePrimaryTaggings < ActiveRecord::Migration[5.0]
  def change
    create_table :primary_taggings do |t|
      t.belongs_to :tag, foreign_key: true
      t.belongs_to :note, foreign_key: true

      t.timestamps
    end
  end
end
