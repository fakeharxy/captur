require 'rails_helper'

RSpec.describe Tag, type: :model do
  context 'editing tags' do
    it 'can change the importance' do
      tag = Tag.create!(id:1, name:"hello", importance:5)
    end

    it 'finds all prime tags' do
      @note1 = Note.create!(body: 'test')
      @note2 = Note.create!(body: 'test')
      @note1.all_secondary_tags = 'testtag'
      @note2.primary_tag = 'testtag2'
      expect(Tag.all_prime_tags).to eq(['testtag2'])
    end
  end
end
