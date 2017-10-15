class Note < ApplicationRecord
  has_many :taggings
  has_many :tags, through: :taggings

  def self.order_by_last_seen
    all.order(last_seen: :desc)
  end

  def self.all_tags=(names)
    names.split(',').map do |name|
      Tag.create!(name: name)
    end
  end

  def self.all_tags
    Tag.all.map(&:name).join(", ")
  end
end
