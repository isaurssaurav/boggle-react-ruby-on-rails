require 'json'

class Api::V1::GameController < ApplicationController
  
  def index

  end

  def initialize_game
    render json:helpers::initialize_game
  end

  def initialize_board
    begin
      render json: helpers::initialize_board
    rescue
      render json:{message: 'something went wrong while initializing the board' }, status: :internal_server_error 
    end
  end

  skip_before_action :verify_authenticity_token
  
  def rotate_board
    begin
      render json: helpers::rotate_board(JSON.parse(request.raw_post))
    rescue
      render json:{message: 'something went wrong while rotating the board' }, status: :internal_server_error 
    end
  end


  def submit_word
    @request = JSON.parse(request.raw_post)
    @result = helpers::submit_word(@request['board'],@request['word'])
    
    if @result[:status] == 'SUCCESS'
      render json: {
        word:@request['word'],
        score:@request['word'].length
      }
    else
      render json:{message: @result[:message] }, status: :bad_request 
    end
  end

  
end
