def create_classes(db):
    class Subregion(db.Model):
        __tablename__='subregion'

        id=db.Column(db.Integer,primary_key=True)
        name=db.Column(db.String(64))

        def __repr__(self):
            return '<Subregion %r>' % (self.name)
    
    class SDG_region(db.Model):
        __tablename__='sdg_region'

        id=db.Column(db.Integer,primary_key=True)
        name=db.Column(db.String(64))

        def __repr__(self):
            return '<SDG_region %r>' % (self.name)

    class Geography(db.Model):
        __tablename__='geography'

        id=db.Column(db.Integer,primary_key=True)
        name=db.Column(db.String(64))

        def __repr__(self):
            return '<Geography %r>' % (self.name)
    
    class UNdevgrp(db.Model):
        __tablename__='un_developmentgroup'

        id=db.Column(db.Integer,primary_key=True)
        name=db.Column(db.String(64))

        def __repr__(self):
            return '<UNdevgrp %r>' % (self.name)
       
    class WBincomegrp(db.Model):
        __tablename__='worldbank_incomegroup'

        id=db.Column(db.Integer,primary_key=True)
        name=db.Column(db.String(64))

        def __repr__(self):
            return '<WBincomegrp %r>' % (self.name)
    
    class Country(db.Model):
        __tablename__='country'

        id=db.Column(db.Integer,primary_key=True)
        iso3_code=db.Column(db.String(3))
        country=db.Column(db.String(64))
        sdg_region_id=db.Column(db.Integer)
        subregion_id=db.Column(db.Integer)
        geography_id=db.Column(db.Integer)
        un_developmentgroup_id=db.Column(db.Integer)
        worldbank_incomegroup_id=db.Column(db.Integer)

        def __repr__(self):
            return '<Country %r>' % (self.name)
    
    class Population(db.Model):
        __tablename__='population'

        id=db.Column(db.Integer,primary_key=True)
        country_id=db.Column(db.Integer)
        year=db.Column(db.Integer)
        age=db.Column(db.Integer)
        population_male_thousands=db.Column(db.Float)
        population_female_thousands=db.Column(db.Float)
        population_total_thousands=db.Column(db.Float)

        def __repr__(self):
            return '<Population %r>' % (self.name)

    class Demographic(db.Model):
        __tablename__='demographic'

        id=db.Column(db.Integer,primary_key=True)
        country_id=db.Column(db.Integer)
        year=db.Column(db.Integer)
        death_thousands=db.Column(db.Float)
        death_male_thousands=db.Column(db.Float)
        death_female_thousands=db.Column(db.Float)
        crude_death=db.Column(db.Float)
        life_exp=db.Column(db.Float)
        life_exp_male=db.Column(db.Float)
        life_exp_female=db.Column(db.Float)
        infant_death=db.Column(db.Float)
        infant_mortality=db.Column(db.Float)
        underfive_mortality=db.Column(db.Float)
        birth_thousands=db.Column(db.Float)
        crude_birth=db.Column(db.Float)
        total_fertility=db.Column(db.Float)
        total_pop_natural_change=db.Column(db.Float)
        rate_natural_increase=db.Column(db.Float)
        pop_change=db.Column(db.Float)
        pop_growth_percent=db.Column(db.Float)

        def __repr__(self):
            return '<Demographic %r>' % (self.name)

    return Subregion,SDG_region,Geography,UNdevgrp,WBincomegrp,Country,Population,Demographic
