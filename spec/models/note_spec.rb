require 'rails_helper'

RSpec.describe Note do
  context 'creating notes' do
    it 'gets and orders notes by oldest first' do
      Note.create!(body: 'First', last_seen: Date.today - 5)
      Note.create!(body: 'Last', last_seen: Date.today - 10)
      expect(Note.order_by_last_seen[0].body).to eq('Last')
    end

    it 'cannot create an empty note' do
      note = Note.new(body: '', last_seen: Date.today - 5)
      assert !note.valid?
      assert_equal [:body], note.errors.keys
    end

    it 'defaults last_seen to today' do
      note = Note.new(body: 'hello')
      expect(note.last_seen).to eq(Date.today)
    end

    it 'defaults seen to false' do
      note = Note.new(body: 'hello')
      expect(note.seen).to eq(false)
    end
  end

  context 'creating primary tags' do
    before(:each) do
      @note = Note.create!(body: 'test')
      @note.primary_tag = 'mike'
    end

    it 'adds tag to the database' do
      expect(@note.primetag).to be_kind_of(Tag)
    end

    it 'does not overwrite importance' do
      tag = Tag.create!(name: 'important', importance: 9)
      note = Note.create!(body: 'test')
      note.primary_tag = 'important'
      expect(tag.importance).to eq(9)
    end
  end

  context 'creating secondary tags' do
    before(:each) do
      @note = Note.create!(body: 'test')
      @note.primary_tag = 'hello'
      @note.all_secondary_tags = 'mike,bob,terry'
    end

    it 'adds multiples tags to the database' do
      expect(@note.tags.count).to eq(3)
    end

    it 'can get tags in as an array' do
      @note.primary_tag = 'hello'
      expect(@note.all_tags).to eq(%w(mike bob terry hello))
    end

    it 'will make all tags lowercase' do
      note = Note.create!(body: 'test')
      note.all_secondary_tags = 'Mike,Bob,Terry'
      note.primary_tag = 'hello'
      expect(note.all_tags).to eq(%w(mike bob terry hello))
    end

    it 'will remove question marks' do
      @note.all_secondary_tags = 'mike?,bob?,terry?'
      expect(@note.all_tags).to eq(%w(mike bob terry hello))
    end

    it 'makes all new tags with importance 5' do
      expect(@note.tag_objects[0].importance).to eq(5)
    end
  end

  context 'validations' do
    it 'strips out spaces' do
      @note = Note.create!(body: 'test')
      @note.primary_tag = 'hello'
      @note.all_secondary_tags = 'mike         ,bob,      terry'
      expect(@note.all_tags).to eq(%w(mike bob terry hello))
    end
  end

  context 'dynamic importance' do
    it 'assigns dynamic importance' do
      tag = Tag.create!(name: 'important', importance: 9)
      note = Note.create!(body: 'test', last_seen: 2.days.ago)
      note.primary_tag = 'important'
      expect(note.dynamic_importance).to eq(18)
    end

    it 'can order by dynamic importance' do
      tag = Tag.create!(name: 'important', importance: 9)
      tag2 = Tag.create!(name: 'unimportant', importance: 1)
      note = Note.create!(body: 'first', last_seen: 2.days.ago)
      note2 = Note.create!(body: 'last', last_seen: 2.days.ago)
      note.primary_tag = 'important'
      note2.primary_tag = 'unimportant'
      expect(Note.order_by_dynamic_importance[0].body).to eq('first')
    end

    it 'can order by DI, unhappy path' do
      tag = Tag.create!(name: 'important', importance: 1)
      tag2 = Tag.create!(name: 'unimportant', importance: 9)
      note = Note.create!(body: 'first', last_seen: 2.days.ago)
      note2 = Note.create!(body: 'last', last_seen: 2.days.ago)
      note.primary_tag = 'important'
      note2.primary_tag = 'unimportant'
      expect(Note.order_by_dynamic_importance[0].body).to eq('last')
    end

    it 'removes any that are seen' do
      tag = Tag.create!(name: 'important', importance: 1)
      note = Note.create!(body: 'first', last_seen: 2.days.ago, seen:true)
      note.primary_tag = 'important'
      expect(Note.order_by_dynamic_importance.count).to eq(0)
    end
  end

  context 'searching on tags' do
    it 'finds all notes with a tag' do
      [@note1 = Note.create!(body: 'test'),
       @note2 = Note.create!(body: 'test')].each do |note|
        note.all_secondary_tags = 'testtag'
      end
      expect(Note.tagged_with('testtag').count).to eq(2)
    end
  end
end
