Rails.application.routes.draw do
  devise_for :users
  scope '/api' do
    get '/notes/:tag', to: 'notes#get_by_tag'
    post '/notes/clear_seen', to: 'notes#clear_seen'
    resources :notes
    post '/tags/update', to: 'tags#update_importance'
    post  '/notes/update_last_seen', to: 'notes#update_last_seen'
    get '/tags/get_all', to: 'tags#get_all'
    get '/tags/primes_all', to: 'tags#primes_all'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
