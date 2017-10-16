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
      @note = Note.create!
      @note.all_tags = 'Mike,Bob,Terry'
    end

    it 'adds multiples tags to the database' do
      expect(@note.tags.count).to eq(3)
    end

    it 'can get tags in as a string' do
      expect(@note.all_tags).to eq('Mike, Bob, Terry')
    end
  end

  context 'validations' do
    it 'strips out spaces' do
      @note = Note.create!
      @note.all_tags = 'Mike         ,Bob,      Terry'
      expect(@note.all_tags).to eq('Mike, Bob, Terry')
    end
  end

  context 'searching on tags' do
    it 'finds all notes with a tag' do
     [@note1 = Note.create!,
      @note2 = Note.create!].each do |note|
       note.all_tags = "testTag"
     end
     expect(Note.tagged_with("testTag").count).to eq(2)
    end
  end
end
