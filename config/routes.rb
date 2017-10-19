Rails.application.routes.draw do
  scope '/api' do
    get '/notes/:tag', to: 'notes#get_by_tag'
    resources :notes
    post  '/notes/update_last_seen', to: 'notes#update_last_seen'
    get '/tags/get_all', to: 'tags#get_all'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
