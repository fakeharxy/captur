class Note < ApplicationRecord
  has_many :taggings
  has_many :tags, through: :taggings
  validates :body, presence: true

  def self.order_by_last_seen
    all.order(:last_seen)
  end

  def all_tags=(names)
    self.tags = names.split(',').map do |name|
      Tag.where(name: name.strip.downcase).first_or_create!
    end
  end

  def all_tags
    self.tags.map(&:name).join(", ")
  end

  def self.tagged_with(name)
    Tag.find_by_name!(name).notes
  end
end
