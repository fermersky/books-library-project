import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getDateBetween } from '../../../infrastructure/utils';
import { AuthorView } from '../../entities/AuthorView';
import { AuthorViewFilterDto } from '../../../dto/filters/author-view-filter.dto';
import { Author } from '../../entities/Author';
import { User } from '../../entities/User';

@Injectable()
export class AuthorViewsService {
    constructor(
        @InjectRepository(AuthorView)
        private authorViewRepository: Repository<AuthorView>,
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(filter?: AuthorViewFilterDto): Promise<AuthorView[]> {
        return this.authorViewRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: AuthorViewFilterDto): Promise<AuthorView> {
        return this.authorViewRepository.findOne({ where: this.getFilter(filter) });
    }

    // получить фильтр по полям
    private getFilter(filter?: AuthorViewFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['user'] = this.userRepository.findOneBy({ id: filter.userId });
        fields['author'] = this.authorRepository.findOneBy({ id: filter.authorId });
        fields['viewedAt'] = filter.viewedAt ?? getDateBetween(filter.minViewedAt, filter.maxViewedAt);

        return fields;
    }

    async save(item: AuthorView): Promise<AuthorView> {
        return this.authorViewRepository.save(item);
    }
}
