require 'rails_helper'

RSpec.describe Tag, type: :model do
  context 'editing tags' do
    it 'can change the importance' do
      tag = Tag.create!(id:1, name:"hello", importance:5)
    end
  end
end
