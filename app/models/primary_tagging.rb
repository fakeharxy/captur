class PrimaryTagging < ApplicationRecord
  belongs_to :tag
  belongs_to :note
end