require 'rails_helper'

RSpec.describe Note do
  context 'creating notes' do
    it 'gets and orders notes by oldest first' do
      Note.create!(body: 'First', last_seen: DateTime.now - 5)
      Note.create!(body: 'Last', last_seen: DateTime.now - 10)
      expect(Note.order_by_last_seen[0].body).to eq('Last')
    end

    it 'cannot create an empty note' do
      note = Note.new(body: '', last_seen: DateTime.now - 5)
      assert !note.valid?
      assert_equal [:body], note.errors.keys
    end
  end

  context 'creating secondary tags' do
    before(:each) do
      @note = Note.create!(body: "test")
      @note.all_secondary_tags = 'mike,bob,terry'
    end

    it 'adds multiples tags to the database' do
      expect(@note.tags.count).to eq(3)
    end

    it 'can get tags in as a string' do
      expect(@note.all_tags).to eq('mike, bob, terry')
    end

    it 'will make all tags lowercase' do
      note = Note.create!(body: "test")
      note.all_secondary_tags = 'Mike,Bob,Terry'
      expect(note.all_tags).to eq('mike, bob, terry')
    end

    it 'will remove question marks' do
      @note.all_secondary_tags = 'mike?,bob?,terry?'
      expect(@note.all_tags).to eq('mike, bob, terry')
    end

    it 'makes all new tags with importance 5' do
      expect(@note.tag_objects[0].importance).to eq(5)
    end
  end

  context 'validations' do
    it 'strips out spaces' do
      @note = Note.create!(body: "test")
      @note.all_secondary_tags = 'mike         ,bob,      terry'
      expect(@note.all_tags).to eq('mike, bob, terry')
    end
  end

  context 'searching on tags' do
    it 'finds all notes with a tag' do
     [@note1 = Note.create!(body: "test"),
      @note2 = Note.create!(body: "test")].each do |note|
       note.all_secondary_tags = "testtag"
     end
     expect(Note.tagged_with("testtag").count).to eq(2)
    end
  end
end
