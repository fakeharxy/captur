class TagsController < ActionController::API
  def get_all
    @tags = Tag.all

    render json: @tags
  end
end
