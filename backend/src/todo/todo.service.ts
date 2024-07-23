import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<{ message: string; todo: Todo }> {
    try {
      const createdTodo = await this.todoModel.create(createTodoDto);
      this.logger.log(`Todo created with id: ${createdTodo._id}`);
      return { message: 'Todo successfully created', todo: createdTodo };
    } catch (error) {
      this.logger.error('Error creating todo', error.stack);
      throw new InternalServerErrorException('Failed to create todo');
    }
  }

  async findAll(): Promise<{ message: string; todos: Todo[] }> {
    try {
      const todos = await this.todoModel.find().exec();
      return { message: 'Todos successfully fetched', todos };
    } catch (error) {
      this.logger.error('Error fetching todos', error.stack);
      throw new InternalServerErrorException('Failed to fetch todos');
    }
  }

  async findOne(id: string): Promise<{ message: string; todo: Todo }> {
    try {
      const todo = await this.todoModel.findById(id).exec();
      if (!todo) {
        this.logger.warn(`Todo not found with id: ${id}`);
        throw new NotFoundException(`Todo not found with id: ${id}`);
      }
      return { message: 'Todo successfully fetched', todo };
    } catch (error) {
      this.logger.error(`Error fetching todo with id: ${id}`, error.stack);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch todo');
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<{ message: string; todo: Todo }> {
    try {
      console.log(id);
      
      const updatedTodo = await this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true }).exec();
      if (!updatedTodo) {
        this.logger.warn(`Todo not found with id: ${id}`);
        throw new NotFoundException(`Todo not found with id: ${id}`);
      }
      this.logger.log(`Todo updated with id: ${updatedTodo._id}`);
      return { message: 'Todo successfully updated', todo: updatedTodo };
    } catch (error) {
      this.logger.error(`Error updating todo with id: ${id}`, error.stack);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update todo');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
      if (!deletedTodo) {
        this.logger.warn(`Todo not found with id: ${id}`);
        throw new NotFoundException(`Todo not found with id: ${id}`);
      }
      this.logger.log(`Todo deleted with id: ${deletedTodo._id}`);
      return { message: 'Todo successfully deleted' };
    } catch (error) {
      this.logger.error(`Error deleting todo with id: ${id}`, error.stack);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete todo');
    }
  }
}
