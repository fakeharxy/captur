class Note < ApplicationRecord
  has_many :taggings
  has_one :primaryTagging
  has_many :tags, through: :taggings
  has_one :primetag, through: :primaryTagging, source: :tag
  validates :body, presence: true

  def self.order_by_last_seen
    all.order(:last_seen)
  end

  def all_secondary_tags=(names)
    self.tags = names.split(',').map do |name|
      Tag.where(name: name.strip.downcase.delete('?')).first_or_create!(importance: 5)
    end
  end

  def primary_tag=(tag_name)
    self.primetag = Tag.find_or_create_by(name: tag_name.strip.downcase.delete('?'), importance: 5)
  end


  def all_tags
    [*self.tags.map(&:name), self.primetag.name]
  end

  def tag_objects
    self.tags
  end

  def self.tagged_with(name)
    [*Tag.find_by_name!(name.strip).primes,
     *Tag.find_by_name!(name.strip).notes]
  end
end
