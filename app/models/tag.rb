class Tag < ApplicationRecord
  has_many :taggings
  has_many :primaryTaggings
  has_many :notes, through: :taggings
  has_many :primes, through: :primaryTaggings, source: :note

  def self.all_prime_tags
    
  end
end
