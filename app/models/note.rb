class Note < ApplicationRecord
  has_many :taggings
  has_many :tags, through: :taggings

  def self.order_by_last_seen
    all.order(:last_seen)
  end

  def self.all_tags=(names)
    names.split(',').map do |name|
      Tag.create!(name: name)
    end
  end

  def self.tags
    Tag.all
  end

  def self.all_tags
    Tag.all.map(&:name).join(", ")
  end
end
