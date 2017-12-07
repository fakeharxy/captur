class ChangeDateFormatInLastSeen < ActiveRecord::Migration[5.0]
  def change
    change_column :notes, :last_seen, :Date
  end
end
