require 'rails_helper'

RSpec.describe Note do
  it 'gets and orders notes by oldest first' do
    Note.create!(body: 'First', last_seen: DateTime.now + 5)
    Note.create!(body: 'Last', last_seen: DateTime.now + 10)
    expect(Note.order_by_last_seen[0].body).to eq('Last')
  end
end
