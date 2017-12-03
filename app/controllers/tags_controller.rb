class TagsController < ActionController::API
  def get_all
    @tags = Tag.all.order(importance: :desc)
    render json: @tags
  end

  def primes_all
    @primes = Note.all.map do |note|
       note.primetag
    end.uniq!
    render json: @primes
  end

  def update_importance
    tag = Tag.find_by id: params['taginfo']['id']
    tag.update(:importance => params['taginfo']['value'])
  end
end
