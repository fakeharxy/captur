class NotesController < ActionController::API
  before_action :set_note, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  # GET /notes
  def index
    @notes = Note.order_by_dynamic_importance
    render json: @notes
  end

  # GET /notes/1
  def show
    render json: @note
  end

  # POST /notes
  def create
    @note = Note.new(id: note_params['note_id'],
                     body: note_params['body'],
                     last_seen: DateTime.now)

    @note.all_secondary_tags = note_params['all_tags']
    @note.primary_tag = note_params['prime']

    if @note.save
      render json: @note, status: :created, location: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes/1
  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  def destroy
    @note.destroy
  end

  def get_by_tag
    @notes = Note.tagged_with(params['tag'])

    render json: @notes
  end

  def update_last_seen
    note = Note.find_by id: params['note']['note_id']
    note.update(last_seen: DateTime.now, seen: true)
  end

  def clear_seen
    Note.update_all(seen: false)
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_note
    @note = Note.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def note_params
    params.require(:note).permit(:note_id, :body, :last_seen, :all_tags, :prime)
  end
end
