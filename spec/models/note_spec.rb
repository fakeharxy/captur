require 'rails_helper'

RSpec.describe Note do
  context 'creating notes' do
    it 'gets and orders notes by oldest first' do
      Note.create!(body: 'First', last_seen: DateTime.now - 5)
      Note.create!(body: 'Last', last_seen: DateTime.now - 10)
      expect(Note.order_by_last_seen[0].body).to eq('Last')
    end
  end

  context 'creating tags' do
    before(:each) do
      Note.all_tags = 'Mike,Bob,Terry'
    end

    it 'adds multiples tags to the database' do
      expect(Note.tags.count).to eq(3)
      Note.all
    end

    it 'can get tags in as a string' do
      expect(Note.all_tags).to eq('Mike, Bob, Terry')
    end
  end
end
