class Note < ApplicationRecord
  
  has_many :taggings
  has_many :tags, through: :taggings

  def self.order_by_last_seen
    self.all.order(last_seen: :desc)
  end
end
