import { Entity, PrimaryGeneratedColumn, Column, Relation, ManyToMany, OneToMany } from 'typeorm';
import { Book } from './Book';
import { JoinTable } from 'typeorm';
import { CategoryView } from './CategoryView';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @ManyToMany(type => Book, books => books.categories)
    @JoinTable()
    books: Relation<Book[]>;

    @OneToMany(type => CategoryView, categoryView => categoryView.category)
    categoryViews: Relation<CategoryView[]>;


    constructor(name?: string) {
        this.name = name;
    }
}
