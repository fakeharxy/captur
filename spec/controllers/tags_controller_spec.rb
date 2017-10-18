require 'rails_helper'

RSpec.describe TagsController, type: :controller do

  describe "GET #get_all" do
    it "returns http success" do
      get :get_all
      expect(response).to have_http_status(:success)
    end
  end

end
