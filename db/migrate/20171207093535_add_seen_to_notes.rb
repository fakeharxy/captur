class AddSeenToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :seen, :boolean
  end
end
